import React, { useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import {
  OptionLabel,
  Level,
  CreateUser,
  parseRoleName,
  RoleNames,
} from 'src/utils/types';
import useRolesSelector from './useRolesSelector';
import { FormikErrors, FormikTouched } from 'formik';

type RolesFieldProps = {
  setFieldValue: (field: string, value: any) => void;
  value: number[];
  className?: string;
  touched?: FormikTouched<CreateUser>;
  errors?: FormikErrors<CreateUser>;
};

function RolesField({
  value,
  className,
  setFieldValue,
  touched,
  errors,
}: RolesFieldProps) {
  const { roleOptions } = useRolesSelector();
  const [open, setOpen] = useState(false);
  const loading = open && roleOptions.length === 0;

  return (
    <Autocomplete
      className={className}
      value={
        parseRoleName(
          roleOptions.filter((option) => value.includes(option.value))[0]
            ?.label as RoleNames
        ) || null
      }
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onChange={(_, roleOption: OptionLabel) => {
        setFieldValue('roleIds', roleOption ? [roleOption.value] : []);
      }}
      renderOption={(props, option) => (
        <li {...props} key={option.value}>
          {parseRoleName(option.label as RoleNames)}
        </li>
      )}
      options={roleOptions}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          key={params.id}
          name="roleIds"
          label="Rol"
          variant="outlined"
          sx={{
            width: '80%',
          }}
          error={Boolean(touched.roleIds && errors.roleIds)}
          helperText={touched.roleIds && errors.roleIds}
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

export default RolesField;
