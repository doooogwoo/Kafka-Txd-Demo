package com.bank.TxnProduct.Service;

import com.bank.TxnProduct.model.TransactionEvent;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.KStream;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafkaStreams;

@Configuration
@EnableKafkaStreams
public class KafkaStreamConfig {
//    @Bean
//    public KStream<String, String> kStreamTest(StreamsBuilder streamsBuilder) {
//
//        KStream<String, String> stream = streamsBuilder.stream("kafkastream-test");//訂閱輸入主題
//
//        // 處理邏輯
//        stream.mapValues(value -> value.toLowerCase() +"stream successfully processed")
//                .to("kafkastream-test-output");
//
//        return stream;
//    }
    @Bean
    public KStream<String, TransactionEvent> kStream(StreamsBuilder streamsBuilder) {

        KStream<String, TransactionEvent> stream = streamsBuilder.stream("txn-topic");//訂閱輸入主題

        // 處理邏輯
        KStream<String, TransactionEvent> highAmount =
                stream.filter((k, v) -> v.getAmount().intValue() > 100000);

        highAmount.to("strange-topic");
        highAmount.peek((k,v) -> System.out.println("FILTERED:" + v));
        return stream;
    }
}
