import React, { useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { OptionLabel } from 'src/utils/types';
import useSubjectsSelector from './useSubjectsSelector';

type SubjectsFieldProps = {
  setFieldValue: (field: string, value: any) => void;
  value: OptionLabel[];
  error: boolean;
  helperText: React.ReactNode;
  label: string;
  placeholder?: string;
  className?: string;
};

function SubjectsField({
  value,
  setFieldValue,
  error,
  helperText,
  className,
  label,
  placeholder,
}: SubjectsFieldProps) {
  const { ingredientsOptions } = useSubjectsSelector();
  const [open, setOpen] = useState(false);
  const loading = open && ingredientsOptions.length === 0;

  return (
    <Autocomplete
      className={className}
      value={value}
      open={open}
      onOpen={() => setOpen(true)}
      multiple
      onClose={() => setOpen(false)}
      onChange={(_, subjects: OptionLabel[]) =>
        setFieldValue('subjectIds', subjects)
      }
      fullWidth
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
