import React, { useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { OptionLabel, Ingredient } from 'src/utils/types';
import useIngredientsSelector from './useSubjectsSelector';

type SubjectsFieldProps = {
  setFieldValue: (field: string, value: any) => void;
  value: number[];
  error: boolean;
  helperText: React.ReactNode;
  label: string;
  placeholder?: string;
  className?: string;
};

function SubjectsField({
  value,
  error,
  helperText,
  className,
  label,
  placeholder,
}: // setFieldValue,
SubjectsFieldProps) {
  const { ingredientsOptions } = useIngredientsSelector();
  const [open, setOpen] = useState(false);
  const loading = open && ingredientsOptions.length === 0;

  return (
    <Autocomplete
      className={className}
      // value={
      //   ingredientsOptions.find((ingredient) => ingredient.value === value) ||
      //   null
      // }
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      multiple
      onClose={() => {
        setOpen(false);
      }}
      onChange={(_, ingredient: OptionLabel[]) => {
        // setFieldValue('ingredientId', ingredient ? ingredient.value : 0);
        // onChange(ingredientNumber, ingredient ? ingredient.value : 0);
        console.log('ingredient', ingredient);
      }}
      // sx={{
      //   width: '50%',
      // }}
      fullWidth
      // getOptionLabel={(option: OptionLabel) =>
      //   `${option.value} - ${option.label}`
      // }
      getOptionLabel={(option: OptionLabel) => `${option.label}`}
      options={ingredientsOptions}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          name="ingredientId"
          label={label}
          placeholder={placeholder}
          variant="outlined"
          fullWidth
          sx={{
            width: '90%',
          }}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default SubjectsField;
