import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  blueCell: {
    background: '#33bfff',
    border: '1px solid white',
  },
  cell: {
    background: '#4caf50',
    border: '1px solid white',
  },
})

export const TariffsTable = ({ tarrifs, equalTariffInfoIndexes }) => {
  const classes = useStyles()

  const flatEqualTariffInfo = Object.values(equalTariffInfoIndexes)
    .filter(Boolean)
    .flat()

  const getColorizedRowCells = (
    { displayPrice, speedIn, channels, channels_hd, name },
    i
  ) => {
    const blueClass = flatEqualTariffInfo.some((item) => item === i)
      ? classes.blueCell
      : ''

    const displayPriceClass = displayPrice?.isMostProfitable ? classes.cell : ''
    const speedInClass = speedIn?.isMostProfitable ? classes.cell : ''
    const channelsClass = channels?.isMostProfitable ? classes.cell : ''
    const channelsHDClass = channels_hd?.isMostProfitable ? classes.cell : ''

    return (
      <TableRow key={i}>
        <TableCell>{name.value}</TableCell>
        <TableCell className={`${blueClass} ${displayPriceClass}`}>
          {displayPrice?.value ?? '-'}
        </TableCell>
        <TableCell className={`${blueClass} ${speedInClass}`}>
          {speedIn?.value ?? '-'}
        </TableCell>
        <TableCell className={`${blueClass} ${channelsClass}`}>
          {channels?.value ?? '-'}
        </TableCell>
        <TableCell className={`${blueClass} ${channelsHDClass}`}>
          {channels_hd?.value ?? '-'}
        </TableCell>
      </TableRow>
    )
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Цена</TableCell>
            <TableCell>Скорость интернета</TableCell>
            <TableCell>Количество телеканалов</TableCell>
            <TableCell>Количество HD-телеканалов</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tarrifs.map((tarrif, i) => getColorizedRowCells(tarrif, i))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
