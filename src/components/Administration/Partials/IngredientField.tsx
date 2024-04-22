import React, { useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { OptionLabel, Ingredient } from 'src/utils/types';
import useIngredientsSelector from 'src/hooks/useIngredientsSelector';

type IngredientFieldProps = {
  ingredientNumber: number;
  // setFieldValue: (field: string, value: any) => void;
  // setFieldValue: () => void;
  onChange: (index: number, ingredientId: number) => void;
  value: Ingredient;
  error: boolean;
  helperText: React.ReactNode;
  label: string;
  placeholder?: string;
  className?: string;
};

function IngredientsField({
  ingredientNumber,
  value,
  error,
  helperText,
  className,
  label,
  placeholder,
  // setFieldValue,
  onChange,
}: IngredientFieldProps) {
  const { ingredientsOptions } = useIngredientsSelector();
  const [open, setOpen] = useState(false);
  const loading = open && ingredientsOptions.length === 0;

  return (
    <Autocomplete
      className={className}
      value={
        ingredientsOptions.find((ingredient) => ingredient.value === value) ||
        null
      }
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(_, ingredient: OptionLabel) => {
        onChange(ingredientNumber, ingredient ? ingredient.value : 0);
      }}
      sx={{
        width: '50%',
      }}
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
          sx={{
            width: '50%',
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

export default IngredientsField;
