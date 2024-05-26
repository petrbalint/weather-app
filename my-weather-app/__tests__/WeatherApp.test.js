// __tests__/WeatherApp.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import WeatherApp from '../WeatherApp'; // Adjust the import path as necessary

jest.mock('axios');

describe('WeatherApp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and displays loading state initially', () => {
    const { getByText } = render(<WeatherApp />);
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('fetches and displays weather data', async () => {
    const weatherData = {
      location: { name: 'New York' },
      current: { temp_c: 25, condition: { text: 'Sunny' } }
    };

    axios.get.mockResolvedValueOnce({ data: weatherData });

    const { getByText, findByText } = render(<WeatherApp />);

    // Check if the weather data is displayed
    const location = await findByText('Location: New York');
    expect(location).toBeTruthy();

    const temperature = await findByText('Temperature: 25°C');
    expect(temperature).toBeTruthy();

    const condition = await findByText('Condition: Sunny');
    expect(condition).toBeTruthy();
  });

  it('handles location change', () => {
    const { getByPlaceholderText } = render(<WeatherApp />);

    const input = getByPlaceholderText('Enter location');
    fireEvent.changeText(input, 'Los Angeles');

    expect(input.props.value).toBe('Los Angeles');
  });

  it('fetches new weather data on form submission', async () => {
    const weatherData = {
      location: { name: 'Los Angeles' },
      current: { temp_c: 20, condition: { text: 'Cloudy' } }
    };

    axios.get.mockResolvedValueOnce({ data: weatherData });

    const { getByText, getByPlaceholderText, findByText } = render(<WeatherApp />);

    const input = getByPlaceholderText('Enter location');
    fireEvent.changeText(input, 'Los Angeles');
    fireEvent.press(getByText('Get Weather'));

    // Check if the new weather data is displayed
    const location = await findByText('Location: Los Angeles');
    expect(location).toBeTruthy();

    const temperature = await findByText('Temperature: 20°C');
    expect(temperature).toBeTruthy();

    const condition = await findByText('Condition: Cloudy');
    expect(condition).toBeTruthy();
  });

  it('handles API error', async () => {
    axios.get.mockRejectedValueOnce(new Error('Error fetching the weather data'));

    const { getByText, findByText } = render(<WeatherApp />);

    // Check if the error message is displayed
    const errorMessage = await findByText('Error fetching the weather data');
    expect(errorMessage).toBeTruthy();
  });
});
