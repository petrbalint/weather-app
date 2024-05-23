package petrbalint.backend.services;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Data
public class WeatherResponse {
    private final String location;
    private final String condition;
    private final double temperature;


    public WeatherResponse(String location, String condition, double temperature) {
        this.location = location;
        this.condition = condition;
        this.temperature = temperature;
    }
}
