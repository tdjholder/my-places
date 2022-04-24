import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Container, FormControlLabel, FormGroup, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import './Countries.css';

import { continents, countries, Country } from 'countries-list';
  
const groupedCountries = Object.values(countries).reduce(function (r, a) {
    r[a.continent] = r[a.continent] || [];
    r[a.continent].push(a);
    return r;
}, Object.create(null));

  export const options = {
    backgroundColor: "#dbdbdb",
    datalessRegionColor: "#7e7f80",
    defaultColor: "#f5f5f5",
    magnifyingGlass: {enable: true},
    enableRegionInteractivity: true
  };

  type MapProps = {
      data: any[];
      setData: (data: any[]) => void;
  }


export const Countries = ({data, setData}: MapProps) => {

    const addCountry = (name: string) => {
        setData([...data, [name, 1]]);
    }

    const removeCountry = (name: string) => {
        setData(data.filter((row: any) => {
            const [country, ...rest] = row;
            return country !== name;
        }))

    }
     

    return <Container sx={{"marginTop": "25px"}}>{Object.keys(groupedCountries).map((continent: string) => {
        if(continent === 'AN'){
            return <React.Fragment/>
        }
        

        return <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            {/* @ts-ignore */}
          <Typography>{continents[continent]}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <FormGroup>
          {groupedCountries[continent].map((country: Country) => {
                  return  <FormControlLabel control={<Checkbox id={country.name} onClick={(e) => {
                    //   @ts-ignore
                    const country= e.target.id
                    //   @ts-ignore
                    const added = e.target.checked
                    if(added){
                        addCountry(country);
                    } else {
                        removeCountry(country);
                    }
                    
                  }}/>} label={`${country.emoji} ${country.name}`} />
          })}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    })}</Container>
}
