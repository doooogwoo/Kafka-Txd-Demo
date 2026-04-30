package com.bank.TxnProduct.Service.RandomDataBuild;

import org.springframework.stereotype.Component;

//Snowflake算法生成唯一ID
@Component
public class TxnIdUtil {
    private static final long MACHINE_ID = 1L;
    private static final long SEQUENCE_BITS = 12;
    private static final long MAX_SEQUENCE = (1 << SEQUENCE_BITS) - 1;

    private static long lastTimestamp = -1L;
    private static long sequence = 0L;

    public  synchronized String generateTxnId() {
        long timestamp = System.currentTimeMillis();

        if (timestamp == lastTimestamp) {
            sequence = (sequence + 1) & MAX_SEQUENCE;

            if (sequence == 0) {
                // 等下一毫秒
                while (timestamp == lastTimestamp) {
                    timestamp = System.currentTimeMillis();
                }
            }
        } else {
            sequence = 0;
        }

        lastTimestamp = timestamp;

        long id = (timestamp << 22) | (MACHINE_ID << 12) | sequence;

        return "TXN-" + id;
    }
}