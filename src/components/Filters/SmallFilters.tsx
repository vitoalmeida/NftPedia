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
// Types
import { Filter } from '../../@types/general';
import Button from '../Button';

interface Props {
  filterValues: Filter;
  closeFilter: Function;
}

const SmallFilters: React.FC<Props> = ({ filterValues, closeFilter }) => {
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
      className="flex flex-col w-full py-8 duration-500"
    >
      <form onSubmit={event => handleFilter(event)}>
        <div className="px-14">
          <h1 className="text-[2.5rem] text-black font-bold">Filtros</h1>
          <p className="filter-text mt-2">Indo para</p>
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setGoingToFilter(event.target.value)
            }
            value={goingToFilter}
            type="text"
            name="goingTo"
            placeholder="Ex: Salvador"
          />
          <p className="filter-text">Viajantes</p>
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
            <div className="flex flex-row date-range justify-between px-14">
              <div className="flex flex-col">
                <p className="filter-text">Check in</p>
                <input
                  className={
                    'border-[#DEDEDE] border-[0.1rem] rounded-xl px-3 py-2 w-32' +
                    (focus === 'startDate' ? ' -focused' : '')
                  }
                  {...startDateInputProps}
                  placeholder="Início"
                />
              </div>

              <div className="flex flex-col">
                <p className="filter-text">Check out</p>
                <input
                  className={
                    'border-[#DEDEDE] border-[0.1rem] rounded-xl px-3 py-2 w-32' +
                    (focus === 'endDate' ? ' -focused' : '')
                  }
                  {...endDateInputProps}
                  placeholder="Fim"
                />
              </div>
            </div>
          )}
        </DateRangePicker>

        <span className="flex my-10 h-1 mx-24 bg-gray-50 rounded-full" />

        <div className="flex flex-col w-full px-[4.5rem] h-20 mt-[-0.5rem]">
          <p className="filter-text ml-[-1rem]">Preço</p>
          <div className="mt-5">
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

          <p className="filter-text ml-[-1rem] mt-8">Estrelas</p>
          <div className="ml-[-1rem] mt-[-0.6rem]">
            <StarRating onChange={setStarsFilter} value={starsFilter} />
          </div>
        </div>

        <div className="mx-14 mt-44 pb-14">
          <Button isSubmitting={loadingHotels} text="FILTRAR" />
        </div>
      </form>
    </div>
  );
};

export default SmallFilters;
