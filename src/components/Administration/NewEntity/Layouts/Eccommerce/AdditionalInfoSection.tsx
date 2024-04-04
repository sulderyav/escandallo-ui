import React, { useState, ChangeEvent, FC } from 'react';
import {
  CardHeader,
  Tab,
  Box,
  Tabs,
  Divider,
  Card,
  styled,
} from '@mui/material';

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(2)};
  `
);

type AdditionalInfoSectionProps = {
  title?: string;
  tabs: { value: string; label: string }[];
  tabsContent?: { value: string; Content: React.ReactNode }[];
};

const AdditionalInfoSection: FC<AdditionalInfoSectionProps> = ({
  title = 'Información Adicional 2',
  tabs,
  tabsContent,
}) => {
  const [currentTab, setCurrentTab] = useState<string>(
    tabs.length > 0 ? tabs[0].value : ''
  );

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <Card>
      <CardHeader title={title} />
      <Divider />
      <TabsContainerWrapper>
        <Tabs
          onChange={handleTabsChange}
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </TabsContainerWrapper>
      <Divider />
      <Box p={3}>
        {tabsContent?.map(
          (tabContent, index) =>
            tabContent.value === currentTab && (
              <div key={index}>{tabContent.Content}</div>
            )
        )}
      </Box>
    </Card>
  );
};

export default AdditionalInfoSection;
