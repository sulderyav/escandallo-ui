import React, { useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { OptionLabel, Level } from 'src/utils/types';
import useLevelsSelector from './useLevelsSelector';

type LevelsFieldProps = {
  setFieldValue: (field: string, value: any) => void;
  value: number[];
  error: boolean;
  helperText: React.ReactNode;
  className?: string;
};

function LevelsField({
  value,
  error,
  helperText,
  className,
  setFieldValue,
}: LevelsFieldProps) {
  const { levelOptions } = useLevelsSelector();
  const [open, setOpen] = useState(false);
  const loading = open && levelOptions.length === 0;

  return (
    <Autocomplete
      className={className}
      value={levelOptions.filter((option) => value.includes(option.value))}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onChange={(_, levelOption: OptionLabel[]) => {
        setFieldValue(
          'levelIds',
          levelOption.map((option) => option.value)
        );
      }}
      multiple
      getOptionLabel={(option: OptionLabel) => `${option.label}`}
      options={levelOptions}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          name="levelIds"
          label="Niveles"
          variant="outlined"
          sx={{
            width: '80%',
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

export default LevelsField;
