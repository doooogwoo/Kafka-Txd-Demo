package com.Bank.TxnConsumer;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TxnConsumer {
    private final SimpMessagingTemplate messagingTemplate;
    @KafkaListener(topics = "normal-topic", groupId = "my-txn-group")
    public void listening(TransactionEvent event) {
        System.out.println("received event >" + event.toString());
        messagingTemplate.convertAndSend("/topic/txn", event);
    }

    @KafkaListener(topics = "strange-topic", groupId = "my-StrangeTxn-group")
    public void listeningStrange(TransactionEvent event) {
        System.out.println("STRANGE EVENT >" + event.toString());
        messagingTemplate.convertAndSend("/topic/strange-txn", event);
    }
}
