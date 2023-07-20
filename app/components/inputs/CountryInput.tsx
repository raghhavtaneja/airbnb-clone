"use client";
import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";

export type CountryInputValue = {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
};

interface CountryInputProps {
  value?: CountryInputValue;
  onChange: (value: CountryInputValue) => void;
}

const CountryInput: React.FC<CountryInputProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        value={value}
        options={getAll()}
        onChange={(value) => onChange(value as CountryInputValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500"> {option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountryInput;
