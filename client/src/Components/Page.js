import { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Grid,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { PROVIDERS_QUERY } from '../Queries/providersQuery'
import { TARIFFS_QUERY } from '../Queries/tariffsQuery'
import { addProviderInfo } from '../api/addProviderInfo'
import { getSortedProviderTariffs } from '../api/getSortedProviderTariffs'
import { TariffsTable } from './TariffsTable'
import { Tabber } from './Tabber'

const REGION_URL = 'moskva'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    maxHeight: 500,
  },
}))

function Page() {
  const classes = useStyles()

  const [currentProvider, setCurrentProvider] = useState(null)
  const [sortedTariffsInfo, setSortedTariffsInfo] = useState(null)
  const [isShowSortTableButton, setIsShowSortTableButton] = useState(false)
  const [currentTab, setCurrentTab] = useState(0)

  const providers = useQuery(PROVIDERS_QUERY, {
    variables: {
      filter: `region.url=${REGION_URL}&info.cnt_tariffs>0`,
      limit: 50,
      offset: 0,
      sort: 'name',
    },
    notifyOnNetworkStatusChange: true,
  })

  const providersData = useMemo(
    () => providers?.data?.providers?.data || [],
    [providers]
  )

  const tariffs = useQuery(TARIFFS_QUERY, {
    skip: !currentProvider?.id,
    variables: {
      filter: `region.url=${REGION_URL}&provider.url_name=${currentProvider?.url_name}`,
      limit: 100,
      offset: 0,
      sort: 'name',
    },
    notifyOnNetworkStatusChange: true,
  })

  const tariffsData = useMemo(
    () => tariffs?.data?.tariffs?.data || [],
    [tariffs]
  )

  const handleChange = useCallback(
    (event) => {
      const foundProvider = providersData.find(
        (x) => x.id === +event.target.value
      )

      if (foundProvider) {
        setCurrentProvider(foundProvider)
        setIsShowSortTableButton(false)
        setCurrentTab(0)
        setSortedTariffsInfo(null)
      }
    },
    [providersData]
  )

  const handleSendProviderInfoButtonClick = useCallback(async () => {
    const { id: providerId, name } = currentProvider
    const providerInfo = {
      providerId,
      name,
      tariffs: tariffsData.map((tariff) => ({
        tariffId: tariff.id,
        name: tariff.name,
        displayPrice: tariff.displayPrice,
        speedIn: tariff.internet.speed_in,
        channels: tariff.tv?.channels,
        channelsHD: tariff.tv?.channels_hd,
      })),
    }

    try {
      await addProviderInfo(providerInfo)
      setIsShowSortTableButton(true)
    } catch (e) {}
  }, [currentProvider, tariffsData])

  const [isLoadingSortTariffs, setIsLoadingSortTariffs] = useState(false)

  const handleShowTableButtonClick = async () => {
    if (sortedTariffsInfo) {
      return
    }

    setIsLoadingSortTariffs(true)
    const providerID = currentProvider.id
    const {
      data: { tariffsInfo },
    } = await getSortedProviderTariffs(providerID)

    setIsLoadingSortTariffs(false)
    setSortedTariffsInfo(tariffsInfo)
  }

  const handleTabChange = useCallback(
    (e, newTab) => {
      setCurrentTab(newTab)
    },
    [setCurrentTab]
  )

  return (
    <Container>
      <Typography variant="h3" component="h2">
        Таблица сравнения
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="provider-select-label">Провайдер</InputLabel>
            <Select
              labelId="provider-select-label"
              id="provider-select"
              value={currentProvider?.id || 0}
              onChange={handleChange}
              label="Provider"
              MenuProps={{ classes: { paper: classes.menuPaper } }}
            >
              <MenuItem value="0">
                <em>None</em>
              </MenuItem>
              {providersData.map((provider) => (
                <MenuItem key={provider.id} value={provider.id}>
                  {provider.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid container xs spacing={1}>
          {currentProvider && (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendProviderInfoButtonClick}
                disabled={isShowSortTableButton}
              >
                отправить тарифы для сортировки
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Tabber
        value={currentTab}
        onChange={handleTabChange}
        tabs={[
          {
            title: 'список тарифов',
            content: (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Название тарифа</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tariffsData.map((tariff) => (
                      <TableRow key={tariff.id}>
                        <TableCell component="th" scope="row">
                          {tariff.name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ),
          },
          {
            title: 'отсортированные тарифы',
            disabled: !isShowSortTableButton,
            onClick: handleShowTableButtonClick,
            content: (
              <>
                {isLoadingSortTariffs && <CircularProgress />}
                {sortedTariffsInfo && (
                  <TariffsTable
                    tarrifs={sortedTariffsInfo.tariffs}
                    equalTariffInfoIndexes={
                      sortedTariffsInfo.equalTariffsIndexes
                    }
                  />
                )}
              </>
            ),
          },
        ]}
      />
    </Container>
  )
}

export default Page
