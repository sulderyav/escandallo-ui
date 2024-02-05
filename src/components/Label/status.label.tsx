import Label from 'src/components/Label';

import { TicketStatus, translateStatus } from 'src/utils/types';

export const getStatusLabel = (status: TicketStatus): JSX.Element => {
  const labelText = translateStatus(status);

  const map: {
    [key in TicketStatus]: {
      text: string;
      color:
        | 'primary'
        | 'warning'
        | 'error'
        | 'info'
        | 'success'
        | 'black'
        | 'secondary';
    };
  } = {
    OPEN: {
      text: labelText,
      color: 'primary',
    },
    ON_HOLD: {
      text: labelText,
      color: 'warning',
    },
    CLOSED: {
      text: labelText,
      color: 'error',
    },
    IN_PROGRESS: {
      text: labelText,
      color: 'info',
    },
    RESOLVED: {
      text: labelText,
      color: 'success',
    },
  };

  const { text, color }: any = map[status];

  return <Label color={color}>{text}</Label>;
};
