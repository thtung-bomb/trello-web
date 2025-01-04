export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

// Cách xử lý bug logic trong thu viện Dnd-kit
// Phía FE sẽ tự tạo ra một cái card đặc biệt: placeholder Card, không liên quan tới Back-end
// Cấu trúc id của cái card này để Unique rất đơn giản, không cần phải làm random phức tạp
// "columnId-placeholder-card" (mỗi column chỉ có thể có tối đa một cái Placeholder Card)
// Quan trọng khi tạo: phải đầy đủ: (_id, boardId, columnId, FE_placehilderCard)
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}