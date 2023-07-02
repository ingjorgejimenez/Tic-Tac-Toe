
export const Square = ({ children, updateBoard, isSelected, index }) => {
    const classSquare = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
        updateBoard(index);
    }
    return (
        <div className={classSquare} onClick={handleClick}>
            {children}
        </div>
    )
}
