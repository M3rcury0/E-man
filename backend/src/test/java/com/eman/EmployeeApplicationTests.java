package com.eman;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
class EmployeeApplicationTests {

    @Test
    void contextLoads() {
        // This test will pass if Spring context loads successfully
    }
}