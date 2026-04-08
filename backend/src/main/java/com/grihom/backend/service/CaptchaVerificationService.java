package com.grihom.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CaptchaVerificationService {

    private final RestTemplate restTemplate;

    @Value("${captcha.recaptcha.enabled:true}")
    private boolean captchaEnabled;

    @Value("${captcha.recaptcha.secret:6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe}")
    private String recaptchaSecret;

    @Value("${captcha.recaptcha.verify-url:https://www.google.com/recaptcha/api/siteverify}")
    private String recaptchaVerifyUrl;

    public void verifyOrThrow(String captchaToken, String clientIp) {
        if (!captchaEnabled) {
            return;
        }

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("secret", recaptchaSecret);
        body.add("response", captchaToken);
        if (clientIp != null && !clientIp.isBlank()) {
            body.add("remoteip", clientIp);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        Map<String, Object> response;
        try {
            response = restTemplate.postForObject(recaptchaVerifyUrl, request, Map.class);
        } catch (Exception ex) {
            throw new RuntimeException("Unable to verify captcha at the moment. Please try again.");
        }

        if (response == null || !Boolean.TRUE.equals(response.get("success"))) {
            String errorCodes = extractErrorCodes(response);
            throw new RuntimeException("Captcha verification failed" + errorCodes);
        }
    }

    private String extractErrorCodes(Map<String, Object> response) {
        if (response == null || !response.containsKey("error-codes")) {
            return ".";
        }

        Object rawCodes = response.get("error-codes");
        if (!(rawCodes instanceof List<?> codes) || codes.isEmpty()) {
            return ".";
        }

        return ": " + String.join(", ", codes.stream().map(String::valueOf).toList());
    }
}
