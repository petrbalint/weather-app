package petrbalint.backend.models;

import lombok.Data;

@Data
public class WeatherApiResponse {
    private Location location;
    private Current current;
    //private String name;

    @Data
    public static class Location{
        private String name;
    }

    @Data
    public static class Current{
        private double temp_c;
        private Condition condition;

        @Data
        public static class Condition{
            private String text;
        }
    }
}
