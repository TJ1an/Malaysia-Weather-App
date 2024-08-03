import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Navbar, Cards } from './components';
import { 
  Box, Flex, SimpleGrid, Heading, Select, Input, Text, Button, Divider,
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [oneData, setOneData] = useState([]);
  const [state, setState] = useState('Selangor');
  const [specificLocation, setSpecificLocation] = useState('');
  const [error, setError] = useState('');

  async function fetchStates() {
    try {
      const response = await axios.get('https://api.data.gov.my/weather/forecast/?contains=St@location__location_id');
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch states data.');
    }
  }

  async function fetchOther() {
    try {
      const response = await axios.get(`https://api.data.gov.my/weather/forecast/?contains=${specificLocation}@location__location_name`);
      console.log(response.data);
      const filteredData = response.data.filter(item => item.location.location_name.toLowerCase().includes(specificLocation.toLowerCase()));
      if (filteredData.length === 0) {
        setError('No results found for the specified location.');
        setOneData([]);
      } else {
        const sevenDays = filteredData.splice(0, 7);
        setOneData(sevenDays.reverse());
        setError('');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to fetch data for the specified location.');
    }
  }

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const filteredData = data.filter(item => item.location.location_name === state);
      const reverse = filteredData.reverse();
      setOneData(reverse);
      setError('');
    }
  }, [data, state]);

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setSpecificLocation(capitalizedValue);
  };

  const handleSearchClick = async () => {
    await fetchOther();
    onClose(); 
  };

  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <Box display='flex' justifyContent='center' alignItems='center' mb={4}>
        <Button onClick={onOpen}>Open Search Drawer</Button>
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Weather Forecast</DrawerHeader>
          <DrawerBody>
            <Heading size={'md'}>Select a State</Heading>
            <Select placeholder="Select State" value={state} onChange={handleStateChange} paddingTop={'1rem'} paddingBottom={'1rem'}>
              <option value="Selangor">Selangor</option>
              <option value="WP Kuala Lumpur">WP Kuala Lumpur</option>
              <option value="Perlis">Perlis</option>
              <option value="Kedah">Kedah</option>
              <option value="Pulau Pinang">Pulau Pinang</option>
              <option value="Perak">Perak</option>
              <option value="Negeri Sembilan">Negeri Sembilan</option>
              <option value="Johor">Johor</option>
              <option value="Pahang">Pahang</option>
              <option value="Melaka">Melaka</option>
              <option value="Terengganu">Terengganu</option>
              <option value="Sabah">Sabah</option>
              <option value="Sarawak">Sarawak</option>
              <option value="WP Labuan">WP Labuan</option>
              <option value="WP Putrajaya">WP Putrajaya</option>
            </Select>
            <Heading size={'md'} paddingBottom={'1rem'}>Want to be more specific?</Heading>
            <Input placeholder='Enter a location' value={specificLocation} onChange={handleInputChange} />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleSearchClick}>Search</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Divider paddingTop={'1rem'} />
      <Box display='flex' justifyContent='center' alignItems='center' paddingTop={'1rem'}>
        {error ? (
          <Text color='red'>{error}</Text>
        ) : (
          oneData.length > 0 && <Heading paddingLeft={'2rem'} paddingRight={'2rem'}>Weather Forecast for {oneData[0].location.location_name}</Heading>
        )}
      </Box>
      <Flex flexDir='row' justifyContent='center' alignItems='center'>
        <SimpleGrid spacing={10} minChildWidth='100%' p={10}>
          {oneData.length > 0 ? (
            oneData.map((item, index) => (
              <Cards 
                key={index} 
                location={item.location.location_name}
                date={item.date} 
                min_temp={item.min_temp}
                max_temp={item.max_temp}
                morning_forecast={item.morning_forecast}
                afternoon_forecast={item.afternoon_forecast}
                night_forecast={item.night_forecast}
              />
            ))
          ) : (
            !error && 'Loading...'
          )}
        </SimpleGrid>
      </Flex>
    </>
  );
}

export default App;
