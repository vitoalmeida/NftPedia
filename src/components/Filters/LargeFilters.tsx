// Libraries
import React, { useReducer, useState } from 'react';
import { useRouter } from 'next/router';
import { ptBR } from 'date-fns/locale';
import { DateRangePicker } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import InputRange, { Range } from 'react-input-range';
import 'react-input-range/lib/css/index.css';
// Reducer
import { reducerHotel, initialState } from '../../store/hotels';
// Components
import Input from '../Input';
import StarRating from '../StarRating';
import DateInput from '../DateInput';
// Types
import { Filter } from '../../@types/general';
import Button from '../Button';

interface Props {
  filterValues: Filter;
  closeFilter: Function;
}

const LargeFilters: React.FC<Props> = ({ filterValues, closeFilter }) => {
  // Reducer
  const [hotelState, dispatch] = useReducer(reducerHotel, initialState);
  const { loadingHotels } = hotelState;

  // Router
  const router = useRouter();

  // Going to filter state
  const [goingToFilter, setGoingToFilter] = useState(
    filterValues.goingTo ? (filterValues.goingTo as string) : undefined
  );
  // Travelers filter state
  const [travelersFilter, setTravelersFilter] = useState(
    filterValues.travelers ? filterValues.travelers : undefined
  );
  // Date filter states
  const [startDate, setStartDate] = useState<Date | null>(
    filterValues.checkIn ? new Date(String(filterValues.checkIn)) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    filterValues.checkOut ? new Date(String(filterValues.checkOut)) : null
  );
  // Price filter state
  const [priceFilter, setPriceFilter] = useState<Range | undefined>(
    filterValues.price
      ? {
          max: Number(filterValues.price[1]),
          min: Number(filterValues.price[0]),
        }
      : {
          max: 999,
          min: 0,
        }
  );
  // Star filter
  const [starsFilter, setStarsFilter] = useState(
    filterValues.stars ? Number(filterValues.stars) : 0
  );

  // Function to get filter action
  function handleFilter(event) {
    event.preventDefault();
    dispatch({ type: 'FILTER_HOTELS' });
    closeFilter();
    
    router.push({
      pathname: '/searchHotel',
      query: {
        goingTo: goingToFilter || undefined,
        travelers: travelersFilter || undefined,
        price:
        [String(priceFilter?.min), String(priceFilter?.max)] || undefined,
        stars: String(starsFilter) || undefined,
        checkIn: startDate ? startDate.toISOString() : undefined,
        checkOut: endDate ? endDate.toISOString() : undefined,
      },
    });
    dispatch({ type: 'FILTER_HOTELS_SUCCESS' });
  }

  return (
    <div
      id="filter-conteinter"
      className="flex flex-col w-full py-8 items-center duration-500"
    >
      <form onSubmit={handleFilter} className="flex flex-row">
        <span className="filter-y-line" />
        <div id="left-filter">
          <h1 className="text-[2.5rem] text-black font-bold">Filtros</h1>
          <div className="flex flex-row items-center mt-2 justify-between">
            <div className="flex-col mr-5 w-full">
              <p className="filter-text">Indo para</p>
              <div>
                <Input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setGoingToFilter(event.target.value)
                  }
                  value={goingToFilter}
                  type="text"
                  name="goingTo"
                  placeholder="Ex: Salvador"
                />
              </div>
            </div>
            <div className="flex-col">
              <p className="filter-text">Viajantes</p>
              <div className="w-32">
                <Input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setTravelersFilter(event.target.value)
                  }
                  value={travelersFilter}
                  type="number"
                  icon="users"
                  name="travelers"
                  placeholder="Ex: 1"
                />
              </div>
            </div>
          </div>
          <DateRangePicker
            startDate={startDate || undefined}
            endDate={endDate || undefined}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            minimumLength={1}
            minimumDate={new Date()}
            format="dd MMM yyyy"
            locale={ptBR}
          >
            {({ startDateInputProps, endDateInputProps, focus }) => (
              <div className="flex flex-row date-range justify-between">
                <div className="flex flex-col mr-3">
                  <p className="filter-text">Check in</p>
                  <DateInput
                    focus={focus}
                    dateInputProps={startDateInputProps}
                    type="startDate"
                    placeholder="Início"
                  />
                </div>

                <div className="flex flex-col ml-3">
                  <p className="filter-text">Check out</p>
                  <DateInput
                    focus={focus}
                    dateInputProps={endDateInputProps}
                    type="endDate"
                    placeholder="Fim"
                  />
                </div>
              </div>
            )}
          </DateRangePicker>
        </div>

        <span className="filter-y-line" />

        <div id="right-filter">
          <div className="flex flex-col w-full mt-14">
            <p className="filter-text">Preço</p>
            <div className="mt-5 ml-4">
              <InputRange
                maxValue={999}
                minValue={0}
                value={priceFilter || 0}
                formatLabel={value => `R$ ${value}`}
                onChange={value =>
                  setPriceFilter(typeof value !== 'number' ? value : undefined)
                }
              />
            </div>

            <p className="filter-text mt-8">Estrelas</p>
            <div className="mt-[-0.6rem]">
              <StarRating onChange={setStarsFilter} value={starsFilter} />
            </div>
          </div>
        </div>

        <span className="filter-y-line ml-16 xl:ml-28" />

        <div className="absolute bottom-10 left-0 w-full">
          <div className="flex relative lg:w-[66rem] xl:w-[79rem] mx-auto px-10 duration-500">
            <div className="w-full">
              <Button isSubmitting={loadingHotels} text="FILTRAR" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LargeFilters;
