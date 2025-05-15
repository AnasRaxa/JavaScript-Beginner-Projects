export const TILE_STATUSES = {
    HIDDEN : "hidden",
    MINE : "mine",
    NUMBER : "number",
    MARKED : "marked"
}





export function createBoard(boardSize,numberOfMines){

    const minePositions = getMinePositions(boardSize,numberOfMines)



    const board = []

    for(let x = 0; x<boardSize; x++){
        let row = []
        for(let y = 0; y<boardSize; y++){
            const element = document.createElement("div")
            element.dataset.status = TILE_STATUSES.HIDDEN

            const tile = {
                x,y,
                mine: minePositions.some(positionMatch.bind(null,{x,y})),
                element,
                get status(){
                    return this.element.dataset.status
                },
                set status(value){
                    this.element.dataset.status = value
                }
            }
            row.push(tile)
        }
        board.push(row)
    }
    return board
}

export function revealTile(board,tile){
    if(tile.status != TILE_STATUSES.HIDDEN) return
    if(tile.mine){
        tile.status = TILE_STATUSES.MINE
        return
    }


    tile.status = TILE_STATUSES.NUMBER
    const adjacentTiles = nearbyTiles(tile,board)
    const mines = adjacentTiles.filter(t => t.mine)
    if(mines.length == 0){
        adjacentTiles.forEach(revealTile.bind(null,board))
    }else{
        tile.element.textContent = mines.length
    }
}

export function markTile(tile){
    if(tile.status !== TILE_STATUSES.HIDDEN && tile.status !== TILE_STATUSES.MARKED) returns

    if(tile.status === TILE_STATUSES.MARKED) tile.status = TILE_STATUSES.HIDDEN
    else tile.status = TILE_STATUSES.MARKED
}


function getMinePositions(boardSize,numberOfMines){
    const positions = []

    while(positions.length < numberOfMines){
        const position = {
            x: randomNumber(boardSize),
            y: randomNumber(boardSize)
        }
        if(!positions.some(positionMatch.bind(null,position))){
            positions.push(position)
        }
    }


    return positions
}

function positionMatch(a,b){
    return a.x == b.x && a.y == b.y
}

function randomNumber(boardSize){
    return Math.floor(Math.random() * boardSize)
}


function nearbyTiles({x,y},board){
    const tiles = []

    for(let xOffset = -1; xOffset<=1; xOffset++){
        for(let yOffset= -1; yOffset<=1; yOffset++){
            const tile = board[x+xOffset]?.[y+yOffset]
            if(tile) tiles.push(tile)
        }    
    }



    return tiles
}

export function checkWin(board) {
    return board.every(row => {
      return row.every(tile => {
        return (
          tile.status === TILE_STATUSES.NUMBER ||
          (tile.mine &&
            (tile.status === TILE_STATUSES.HIDDEN ||
              tile.status === TILE_STATUSES.MARKED))
        )
      })
    })
  }

export function checkLoss(board){
    return board.some(row =>{
        return row.some( tile => tile.status === TILE_STATUSES.MINE)
    })
}

