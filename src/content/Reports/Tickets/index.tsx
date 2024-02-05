import ReportsComponent from 'src/components/Reports/Router';
import AvailableReports from './AvailableReports';
import Report from './Report';

const Participants = () => {
  return (
    <ReportsComponent
      renderAvailableReports={(props) => <AvailableReports {...props} />}
      renderReport={() => <Report />}
      texts={{
        name: 'Tickets',
      }}
    />
  );
};

export default Participants;
