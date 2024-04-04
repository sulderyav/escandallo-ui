import { ChangeEvent, FC, useState, useEffect, Fragment } from 'react';
import {
  ListItemText,
  Avatar,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Switch,
  Divider,
  Grid,
  ListItem,
  List,
  CardHeader,
  Card,
  styled,
  Autocomplete,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListSubheader,
  ListItemAvatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Formik } from 'formik';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
const Sidebar: FC<{
  renderButtons: () => React.ReactNode;
  sidebar: () => JSX.Element;
}> = ({ renderButtons, sidebar }) => {
  return (
    <Box>
      <Card
        sx={{
          m: 3,
        }}
      >
        {renderButtons()}
      </Card>

      {sidebar && sidebar()}
    </Box>
  );
};

export default Sidebar;
