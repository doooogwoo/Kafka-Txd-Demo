package com.bank.TxnProduct.controller;

import com.bank.TxnProduct.Service.KafkaScheduler;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/kafka/api")
@CrossOrigin(origins = "http://localhost:5173")
public class KafkaController {
    public KafkaController(KafkaScheduler kafkaScheduler) {
        this.kafkaScheduler = kafkaScheduler;
    }

    private final KafkaScheduler kafkaScheduler;
//    @PostMapping("/send")
//    public String sendMessage() {
//        kafkaScheduler.sendTransactionEvent();
//        //kafkaScheduler.sendMessage();
//        return "Message sent to Kafka topic! -event!";
//    }
    @PostMapping("/start-txn")
    public String txnStart() {
        kafkaScheduler.start();
        //kafkaScheduler.sendMessage();
        return "Message sent to Kafka topic --> START!";
    }
    @PostMapping("/stop-txn")
    public String txnStop() {
        kafkaScheduler.stop();
        return "Message sent to Kafka topic --> STOP!";
    }


    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }
}
