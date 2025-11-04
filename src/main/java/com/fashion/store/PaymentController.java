// src/main/java/com/fashion/store/PaymentController.java
package com.fashion.store;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private QRCodeService qrCodeService;

    // API tạo mã QR theo chuẩn VietQR
    // Ví dụ: /api/payment/qr-code?amount=50000&accountNo=0123456789&bank=MBBank&info=Thanh toan don hang 123
    @GetMapping(value = "/qr-code", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getVietQRCode(
        @RequestParam String bank,
        @RequestParam String accountNo,
        @RequestParam long amount,
        @RequestParam String info
    ) {
        try {
            // Tạo chuỗi VietQR (ví dụ, thực tế cần tuân thủ chuẩn)
            // Format đơn giản: "vietqr_string_here"
            // Bạn có thể tìm thư viện hỗ trợ tạo chuỗi VietQR đúng chuẩn
            String qrContent = String.format(
                "00020101021138590010A000000727012700069704230111%s0208QRIBFTTA5303704540%d5802VN62%d%s6304",
                accountNo.length() + bank.length() + 20, // Lengths
                amount,
                info.length(),
                info.replaceAll(" ", "%20") // URL Encode info
            );

            byte[] qrCode = qrCodeService.generateQRCode(qrContent, 300, 300);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(qrCode);
        } catch (Exception e) {
            // Xử lý lỗi
            return ResponseEntity.internalServerError().build();
        }
    }
}