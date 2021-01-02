'use strict'

///////////
// Gantt //
///////////

let startDate = dateParse(0)

const addRow = (id, text, fillId = false, th = false) => {
  const columnType = (th ? 'th' : 'td')
  const columns = [{ tag: columnType, text: text }]

  for (let i = 0; i < 365; i++) {
    columns.push({ tag: columnType, text: fillId ? (i + 1) : '' })
  }

  return createDom({
    id: `${id}-gantt`,
    tag: 'tr',
    children: columns
  }, '#gantt')
}

const addGanttFirstRow = () => {
  // Gantt
  addRow(guid(), '', true, true)
}

const updateGanttRow = (component) => {

}

const addGanttRow = (component) => {
  if (component.type !== 'Task') return


  if (component.isFirstTask) {
    startDate = component.startDate
  }

  const dom = addRow(component.id, component.text, false)



  const startCell = dateDiff(startDate, component.startDate)
  const endCell = startCell + component.duration

  console.log(component.text, startCell, endCell)

  for (let i = startCell; i < endCell; i++) {
    dom.children[i + 1].classList.add('ganttCell')
  }
}

// Load
$(() => {
  addGanttFirstRow()
})