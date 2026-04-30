package com.Bank.TxnConsumer;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TxnConsumer {
    private final SimpMessagingTemplate messagingTemplate;
    @KafkaListener(topics = "txn-topic", groupId = "my-new-group-rider")
    public void listening(TransactionEvent event) {
        System.out.println("received event >" + event.toString());
        messagingTemplate.convertAndSend("/topic/txn", event);
    }
}
