package com.bank.TxnProduct.Service.RandomDataBuild;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class RandomData {

    private final List<String> accounts;
    private final Random random = new Random();
    private final TxnIdUtil txnIdUtil ;

    //帳號初始化
    private  RandomData(TxnIdUtil txnIdUtil) {
        this.txnIdUtil = txnIdUtil;
        this.accounts = IntStream.range(1, 101)
                .mapToObj(i -> "ACC-" + i)
                .toList();
    }
    public String getRandomTransactionId(){
        return  txnIdUtil.generateTxnId();
    }

    public String getRandomAccountId() {
        return accounts.get(random.nextInt(accounts.size()));
    }
    public BigDecimal getRandomAmount() {
        double chance = ThreadLocalRandom.current().nextDouble();
        int amount;
        if (chance < 0.05) {
            // 🔴 大額交易（5%）
            amount = ThreadLocalRandom.current().nextInt(100000, 100000000);
        } else {
            // 🟢 一般交易（95%）
            amount = ThreadLocalRandom.current().nextInt(0, 5000);
        }
//
//        return BigDecimal
//                .valueOf(amount)
//                .setScale(2, RoundingMode.HALF_UP);

        return BigDecimal.valueOf(amount); // 已經是整數
    }

    //ThreadLocalRandom.current().nextInt vs Random.nextInt
    //ThreadLocalRandom.current().nextInt() 是 Java 7 引入的，專為多線程環境設計。它使用了 ThreadLocal 來確保每個線程都有自己的隨機數生成器，避免了多線程競爭和鎖的問題，因此在多線程環境中性能更好。
    //Random.nextInt() 是傳統的隨機數生成器，適用於單線程環境。在多線程環境中，如果多個線程同時使用同一個 Random 實例，可能會導致性能下降和不確定的行為，因為 Random 內部使用了鎖來保護其狀態。
    public int getRandomNum() {
        return random.nextInt(101);
    }



}
