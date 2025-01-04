
import { useCallback, useEffect, useRef, useState } from 'react'
import { cloneDeep, isEmpty } from 'lodash'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  closestCenter
} from '@dnd-kit/core'

import {
  arrayMove
} from '@dnd-kit/sortable'

import Columns from './ListColumns/Column/Columns'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { generatePlaceholderCard } from '~/utils/formartter'


const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  // delay 250 nhấn giữ khoảng 250 ms, dung sai của cảm ứng
  // di chuyển chênh lệch 5px thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  const mySensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumn, setOldColumn] = useState(null)

  // điểm va chạm cuối cùng của trước đó (xử lý thuật toán phát hiện va chạm, )
  const lastOverId = useRef(null)

  useEffect(() => {
    // const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleMoveCardBetweenColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      /**
       * Tìm vị trí (index) của cái overCard trong column đích (nơi mà activeCard sắp được thả)
       */
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
      // console.log(overCardIndex)

      // Logic tính toán cardIndex mới (trên hoặc dưới của overcard) lấy chuẩn ra từ code của thư viện
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      // nextActiveCollumn Column cũ
      if (nextActiveColumn) {
        // Xóa card ra khỏi column active (cũng có thể hiểu là column cũ, cái lcus mà kéo card ra khỏi nó để sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // Thêm placeholder Card nếu column rỗng: Bị kéo hết Card đi. không còn cái nào nữa
        if (isEmpty(nextActiveColumn?.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        // cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      // nextOverColumn: Column mới
      if (nextOverColumn) {
        // Kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa, nếu có cần xóa nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // Tiếp theo là thêm cái card đang kéo vào overcolumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

        // Xóa placeholder card đi nếu nó đang tồn tại
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      // console.log('nextColumns', nextColumns)

      return nextColumns
    })
  }

  // find column by cardId
  const findColumnByCardId = (cardId) => {
    // Lưu ý: nên dùng c.cards thay vì c.cardOrderIds bởi vì ở bước handleDragOver chúng ta sẽ làm dữ liệu cho cards hoàn chỉnh trước
    // rồi mới tạ ra cardOrderIds mới
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  // trigger khi bat dau keo mot phan tu
  const handleDragStart = (event) => {
    // console.log('handle drag start: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    // Nếu là kéo card thì mới thực hiện hành động set giá trị oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumn(findColumnByCardId(event?.active?.id))
    }
  }

  // trigger trong qua trinh keo 1 phan tu
  const handleDragOver = (event) => {

    // khong lam gi neu dang keo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return
    }

    // console.log('Handle Drag Over', event)
    const { active, over } = event

    // con keo card thi xu ly them de co the keo card qua lai giua cac column

    if (!active || !over) {
      return
    }


    // activeDraggingCard = card dang duoc keo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active

    // overCard = card dang tuong tac tren/duoi so voi cai card duoc keo o tren
    const { id: overCardId } = over

    // Tim 2 cai columns theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // console.log('active column', activeColumn)
    // console.log('over column', overColumn)

    // check khong ton tai 1 trong 2 columns thi ko lam gi
    if (!activeColumn || !overColumn) {
      return
    }

    /**
     * xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau, còn nếu kéo card trong chính column ban đầu thì ko làm gì
     * vì đây đang là đoạn xử lý lúc kéo (handleDragOver), còn xử lý lúc kéo xong xuôi thfi nó lại là vấn để khác ở (handleDragEnd)
     */
    if (activeColumn._id !== overColumn._id) {
      handleMoveCardBetweenColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }

  }

  // trigger khi ket thuc keo mot phan tu => hanh dong tha (drop)
  const handleDragEnd = (event) => {

    // console.log(event)
    const { active, over } = event

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('Hanh dong keo tha card')

      // activeDraggingCard = card dang duoc keo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active

      // overCard = card dang tuong tac tren/duoi so voi cai card duoc keo o tren
      const { id: overCardId } = over

      // Tim 2 cai columns theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // console.log('active column', activeColumn)
      // console.log('over column', overColumn)

      // check khong ton tai 1 trong 2 columns thi ko lam gi
      if (!activeColumn || !overColumn) {
        return
      }

      // hành động kéo thả card giữa 2 column khác nhau
      // phải dùng tới activeDragItemData.columnId hoặc oldColumnWhenDraggingCard._id set vào state từ bước handleDragStart
      // chứ ko phải activeData trong scope handleDragEnd này vì sau khi đi qua onDragOver tới đây là state của card đã bị cập nhật 1 lần rồi
      if (oldColumn._id !== overColumn._id) { // Kéo card đi giữa 2 column khác nhau
        handleMoveCardBetweenColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else { // hành động kéo that card trong cùng 1 column
        // lay vi tri cu tu oldColumn
        const oldCardIndex = oldColumn?.cards?.findIndex(c => c._id === activeDragItemId)
        // lay vi tri moi tu over
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        // Dùng array move vì kéo card trong 1 cái column thì tương tự với logic kéo column trong một cái board content
        const dndOrderedCard = arrayMove(oldColumn?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          // Tìm tới cái column mà ta đang thả
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          // Cập nhật lại 2 giá trị mới là card và cardOrderIds trong cái targetColumn
          targetColumn.cards = dndOrderedCard
          targetColumn.cardOrderIds = dndOrderedCard.map(card => card._id)
          // console.log('target column', targetColumn)

          return nextColumns
        })
      }
    }

    // check over is not defined
    if (!over) {
      return
    }

    // Xử lý kéo thả columns
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {

      // If over is difference active
      if (active.id !== over.id) {
        // lay vi tri cu tu active
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)

        // lay vi tri moi tu over
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)

        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

        /**
         * xu ly goi API
         * refresh lai trang khong mat column ban dau
         */

        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

        setOrderedColumns(dndOrderedColumns)
      }
    }

    // Những dữ liệu sau khi kéo thả này luôn phải đưa về giá trị null (mặc định ban đầu)
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumn(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: 0.5
        }
      }
    })
  }

  // Hàm này custom lại thuật toán phát hiện va chạm tối ưu cho việc kéo thả card giữa nhiều columns
  // args = arguments = (các đối số, tham số)
  const collisionDetectionStrategy = useCallback((args) => {
    // Kéo thả columns thì dùng closestCorners
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    // tìm các điểm va chạm, giao nhau - intersections với con trỏ
    const pointerIntersections = pointerWithin(args)

    // sẽ có lỗi column nếu như pointerIntersections là mảng rỗng []
    if (!pointerIntersections?.length) {
      return
    }

    // const intersections = !!pointerIntersections?.length // is Exist
    // !! check mảng có null ko
    // eslint-disable-next-line no-extra-boolean-cast
    const intersections = pointerIntersections.length > 0 ? pointerIntersections : rectIntersection(args)

    // Tìm overId đầu tiên trong đám intersections ở trên
    let overId = getFirstCollision(intersections, 'id')

    if (overId) {
      // fix flickering
      // Nếu over nó là column thì sẽ tìm tới cái cardId gần nhất bên trong khu vực va chạm đó dựa vào thuật toán phát hiện va chạm
      // closestCenter hoặc closestCorners đều được. Tuy nhiên ở đây dùng closestCorners mượt hơn

      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])

  return (
    <DndContext
      sensors={mySensors}
      // Nếu sử dụng clesestCorners thì sẽ có bug flickering + sai lệch dữ liệu
      // collisionDetection={closestCorners}
      // custom thuật toán va chạm
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trelloCustom.boardBarContentHeight,
        p: '10px 0'
      }}>

        {/* Box Column 01*/}
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Columns column={activeDragItemData} />}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>

      </Box>
    </DndContext>
  )
}

export default BoardContent