import org.json.JSONObject;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;

// usage: java [host username password]
public class SimpleClient {

    public static void main(String[] args) throws IOException {
        SimpleClient client = new SimpleClient();
        String host = "https://" + args[0];
        String username = args[1];
        String password = args[2];
        String credentials ="{\"username\":\""+ username +"\",\"password\":\"" + password + "\"}";
        String loginUrl= host + "/api/v1/login/";
        String applicantUrl = host + "/api/v1/applicants/";
        String token = client.login(loginUrl, credentials);
        System.out.println(token);
        boolean isAcceptable = false;
        int requestTimeout = 0;
        long requestTime;
        long time = 0;
        int numberOfRequest = 1000;
        System.out.println("Sending requests...");
        System.out.println();
        for (int i = 1; i <= numberOfRequest; i++) {
            long timeBeforeRequest = System.currentTimeMillis();
            client.requestApplicants(applicantUrl, token);
            requestTime = System.currentTimeMillis() - timeBeforeRequest;
            time += requestTime;
            if (requestTime > 500) {
                requestTimeout++;
            }
        }
        long averageResponseTime = time / numberOfRequest;
        if (!(requestTimeout > (numberOfRequest * 0.05)) && averageResponseTime < 200) {
            isAcceptable = true;
        }
        System.out.println("Number of requests: " + numberOfRequest);
        System.out.println("Average request time(milliseconds): " + averageResponseTime);
        System.out.println("Number of request higher than 100ms: " + requestTimeout);
        System.out.println("Accepted request time: " + isAcceptable);


    }

    private String login(String requestUrl, String credentials) {
        StringBuffer jsonString;
        try {
            URL url = new URL(requestUrl);
            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();

            connection.setDoInput(true);
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Accept", "application/json");
            connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream(), "UTF-8");
            writer.write(credentials);
            writer.close();
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            jsonString = new StringBuffer();
            String line;
            while ((line = br.readLine()) != null) {
                jsonString.append(line);
            }
            br.close();
            connection.disconnect();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
        JSONObject obj = new JSONObject(jsonString.toString());
        return obj.getString("token");

    }

    private void requestApplicants(String requestUrl, String token) {
        StringBuffer jsonString;
        try {
            URL url = new URL(requestUrl);
            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();

            connection.setDoInput(true);
            connection.setDoOutput(true);
            connection.setRequestMethod("GET");
            connection.setRequestProperty("authorization", "JWT " + token);
            connection.setRequestProperty("Accept", "application/json");
            connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            jsonString = new StringBuffer();
            String line;
            while ((line = br.readLine()) != null) {
                jsonString.append(line);
            }
            br.close();
            connection.disconnect();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
