package petrbalint.backend.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import petrbalint.backend.models.WeatherApiResponse;
import petrbalint.backend.services.WeatherResponse;

@RestController
public class WeatherController {

    @Value("${weatherapi.key}")
    private String apiKey;

    @GetMapping("/weather")
    public WeatherResponse getWeather(@RequestParam String location){
        String url = "http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + location;
        RestTemplate restTemplate = new RestTemplate();
        String test = restTemplate.getForObject(url, WeatherApiResponse.class).toString();
        WeatherApiResponse response = restTemplate.getForObject(url, WeatherApiResponse.class);
        //return System.out.println(test);

        if (response != null) {
            return new WeatherResponse(
                    response.getLocation().getName(),
                    response.getCurrent().getCondition().getText(),
                    response.getCurrent().getTemp_c()
            );
        } else {
            return new WeatherResponse("Unknown", "No data", 0);
        }
    }
}
