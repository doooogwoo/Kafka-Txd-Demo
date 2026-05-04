package com.bank.TxnProduct.Service;

import com.bank.TxnProduct.model.TransactionEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class KafkaTest {
    private final KafkaTemplate<String, String> kafkaTemplate;

    public KafkaTest(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

//    @Scheduled(fixedRate = 1000)
//    public void sendMessage() {
//        String message = "test123";
//        kafkaTemplate.send("kafkastream-test", message);
//        System.out.println("Sent: " + message);
//    }

}
