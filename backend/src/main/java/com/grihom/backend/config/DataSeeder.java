package com.grihom.backend.config;

import com.grihom.backend.model.Improvement;
import com.grihom.backend.model.User;
import com.grihom.backend.repository.ImprovementRepository;
import com.grihom.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ImprovementRepository improvementRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.seed.admin.email:admin@homevalue.com}")
    private String adminEmail;

    @Value("${app.seed.admin.password:admin}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
        seedAdminUser();

        if (improvementRepository.count() == 0) {
            improvementRepository.saveAll(List.of(
                Improvement.builder()
                        .title("Fresh Paint (Asian Paints Royale)")
                        .description("A fresh coat of high-quality washable paint gives the home an immediate premium feel and removes all scuff marks.")
                        .cost("Low")
                        .effort("Low")
                        .roi("High")
                        .impact(8)
                        .duration("3-5 Days")
                        .room("All Rooms")
                        .indianSpecific(true)
                        .budgetRange("₹15,000 - ₹50,000")
                        .source("default")
                        .build(),
                Improvement.builder()
                        .title("Modular Kitchen Upgrade (Hettich/Hafele)")
                        .description("Upgrading to soft-close cabinets, tandem drawers, and a chimney can drastically improve the appeal for Indian buyers who prioritize the kitchen.")
                        .cost("High")
                        .effort("High")
                        .roi("High")
                        .impact(20)
                        .duration("2-3 Weeks")
                        .room("Kitchen")
                        .indianSpecific(true)
                        .budgetRange("₹1,00,000 - ₹3,00,000")
                        .source("default")
                        .build(),
                Improvement.builder()
                        .title("Western Toilet with Health Faucet")
                        .description("Replacing old Indian style toilets with wall-mounted Western toilets (Hindware/Cera) with concealed flush tanks.")
                        .cost("Medium")
                        .effort("Medium")
                        .roi("High")
                        .impact(12)
                        .duration("1 Week")
                        .room("Bathroom")
                        .indianSpecific(true)
                        .budgetRange("₹25,000 - ₹60,000")
                        .source("default")
                        .build(),
                Improvement.builder()
                        .title("False Ceiling + LED Profile Lights")
                        .description("A simple peripheral false ceiling with cove lighting and LED panels makes the living room look modern and luxurious.")
                        .cost("Medium")
                        .effort("Medium")
                        .roi("Medium")
                        .impact(10)
                        .duration("1-2 Weeks")
                        .room("Living Room")
                        .indianSpecific(true)
                        .budgetRange("₹40,000 - ₹80,000")
                        .source("default")
                        .build(),
                Improvement.builder()
                        .title("Main Door Varnish & Smart Lock")
                        .description("Polishing the main teakwood door and adding a keyless smart lock (Yale/Godrej) gives a great first impression and security.")
                        .cost("Medium")
                        .effort("Low")
                        .roi("Medium")
                        .impact(7)
                        .duration("1-2 Days")
                        .room("Exterior")
                        .indianSpecific(true)
                        .budgetRange("₹15,000 - ₹40,000")
                        .source("default")
                        .build()
            ));
            System.out.println("✅ Seeded initial improvement data!");
        }
    }

    private void seedAdminUser() {
        User adminUser = userRepository.findByEmail(adminEmail)
                .orElseGet(() -> User.builder()
                        .name("Admin")
                        .email(adminEmail)
                        .isActive(true)
                        .build());

        adminUser.setName("Admin");
        adminUser.setPassword(passwordEncoder.encode(adminPassword));
        adminUser.setRole("ROLE_ADMIN");
        adminUser.setIsActive(true);

        if (adminUser.getId() == null) {
            userRepository.save(adminUser);
            System.out.println("Seeded default admin user: " + adminEmail);
            return;
        }

        userRepository.save(adminUser);
        System.out.println("Promoted " + adminEmail + " to ROLE_ADMIN");
    }
}
