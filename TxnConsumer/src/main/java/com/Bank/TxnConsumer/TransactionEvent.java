package com.Bank.TxnConsumer;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionEvent {
    private String transactionId;
    // 帳戶
    private String accountId;
    // 金額
    private BigDecimal amount;
    // 時間
    private LocalDateTime timestamp;
    // 裝置
    private String deviceId;
}
