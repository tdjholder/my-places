import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

import { continents, countries, Country } from "countries-list";

const groupedCountries = Object.values(countries).reduce(function (r, a) {
  r[a.continent] = r[a.continent] || [];
  r[a.continent].push(a);
  return r;
}, Object.create(null));

type CountriesProps = {
  data: any[];
  setData: (data: any[]) => void;
};

export const Countries = ({ data, setData }: CountriesProps) => {
  const addCountry = (name: string) => {
    setData([...data, [name, 1]]);
  };

  const removeCountry = (name: string) => {
    setData(
      data.filter((row: any) => {
        const [country] = row;
        return country !== name;
      })
    );
  };

  return (
    <Container sx={{ marginTop: "25px" }}>
      {Object.keys(groupedCountries)
        .sort()
        .map((continent: string) => {
          if (continent === "AN") {
            return <React.Fragment />;
          }

          return (
            <Accordion>
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
                  {groupedCountries[continent]
                    .sort((a: Country, b: Country) => {
                      if (a.name < b.name) {
                        return -1;
                      }
                      if (a.name > b.name) {
                        return 1;
                      }
                      return 0;
                    })
                    .map((country: Country) => {
                      return (
                        <FormControlLabel
                          checked={data.some((d: any) => {
                            const [checked_country] = d;
                            return country.name === checked_country;
                          })}
                          control={
                            <Checkbox
                              id={country.name}
                              onClick={(e) => {
                                //   @ts-ignore
                                const country = e.target.id;
                                //   @ts-ignore
                                const added = e.target.checked;
                                if (added) {
                                  addCountry(country);
                                } else {
                                  removeCountry(country);
                                }
                              }}
                            />
                          }
                          label={`${country.emoji} ${country.name}`}
                        />
                      );
                    })}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </Container>
  );
};
