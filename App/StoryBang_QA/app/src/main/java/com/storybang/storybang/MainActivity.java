package com.storybang.storybang;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends AppCompatActivity {

    private Button Send;
    private EditText ID;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        ID = findViewById(R.id.ID);
        Send = findViewById(R.id.Send);

        Send.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String idValue = ID.getText().toString();

                if (idValue.isEmpty()) {
                    Toast.makeText(MainActivity.this, "Please enter an ID", Toast.LENGTH_SHORT).show();
                    return;
                }

                new Thread(() -> {
                    try {
                        URL url = new URL("http://ec2-34-229-125-142.compute-1.amazonaws.com:4027/api/create_account/Recover_Password"); // Replace with your actual endpoint
                        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                        connection.setRequestMethod("POST");
                        connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
                        connection.setDoOutput(true);

                        String jsonInput = "{\"Id\": \"" + idValue + "\"}";

                        try (OutputStream os = connection.getOutputStream()) {
                            byte[] input = jsonInput.getBytes("utf-8");
                            os.write(input, 0, input.length);
                        }

                        BufferedReader reader = new BufferedReader(
                                new InputStreamReader(connection.getInputStream(), "utf-8")
                        );
                        StringBuilder response = new StringBuilder();
                        String line;

                        while ((line = reader.readLine()) != null) {
                            response.append(line.trim());
                        }

                        runOnUiThread(() ->
                                Toast.makeText(MainActivity.this, "Sent successfully!", Toast.LENGTH_SHORT).show()
                        );

                    } catch (Exception e) {
                        e.printStackTrace();  // Esto imprime el error completo en Logcat

                        runOnUiThread(() ->

                                Toast.makeText(MainActivity.this, "Failed to send", Toast.LENGTH_SHORT).show()
                        );
                    }
                }).start();

            }
        });

    }
}