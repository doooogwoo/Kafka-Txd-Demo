package com.bank.TxnProduct.Service;

import com.bank.TxnProduct.Service.RandomDataBuild.RandomData;
import com.bank.TxnProduct.model.TransactionEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.Random;

@Component
public class KafkaScheduler {
    private final KafkaTemplate<String, TransactionEvent> kafkaTemplate;
    private final RandomData randomData;
    private volatile boolean isRunning = false;

    public KafkaScheduler(KafkaTemplate<String, TransactionEvent> kafkaTemplate, RandomData randomData) {
        this.kafkaTemplate = kafkaTemplate;
        this.randomData = randomData;
    }

//    @Scheduled(fixedRate = 1000)
//    public void sendMessage() {
//        String message = "test123";
//        kafkaTemplate.send("test-topic", message);
//        System.out.println("Sent: " + message);
//    }

    public void start() {
        isRunning = true;
        System.out.println("Kafka Producer START");
    }

    public void stop() {
        isRunning = false;
        System.out.println("Kafka Producer STOP");
    }
    @Scheduled(fixedRate = 1000)
    public void sendTransactionEvent() {
        if (!isRunning) return;
        int dataNumber = randomData.getRandomNum();
        System.out.println("dataNumber = " + dataNumber);
        for (int i = 0; i <= dataNumber ; i++) {
            TransactionEvent event = new TransactionEvent(
                    randomData.getRandomTransactionId(),
                    randomData.getRandomAccountId(),
                    randomData.getRandomAmount(),
                    java.time.LocalDateTime.now(),
                    "Device-" + new Random().nextInt(100)
            );
            System.out.println("Sending event: " + event.toString());

            kafkaTemplate.send("txn-topic", event.getAccountId(), event);
        }
    }
}
