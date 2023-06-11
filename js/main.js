document.querySelector(".control-buttons span").onclick = function() {
  let name = prompt("What is Your Name ?");
  if (name == null || name == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = name;
  }
  document.querySelector(".control-buttons").remove()
};

let duration = 1000;
let blockContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blockContainer.children);
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange)

blocks.forEach((block, index) => {
  block.style.order = orderRange[index]

  block.addEventListener("click", function() {
    flipBlock(block)
  })
});

function flipBlock(selectedBlock) {
  
  selectedBlock.classList.add('is-flipped');

  let allFlippedBlocks = blocks.filter(flipBlock => flipBlock.classList.contains('is-flipped'))

  if (allFlippedBlocks.length === 2) {

    stopClicking();

    checkedMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1])
  }
}

function stopClicking() {

  blockContainer.classList.add("no-clicking")

  setTimeout(() => {

    blockContainer.classList.remove("no-clicking");

  },duration)
};

function checkedMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector('.tries span');
  if (firstBlock.dataset.animal === secondBlock.dataset.animal) {
    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');
    
    firstBlock.classList.add('is-matched');
    secondBlock.classList.add('is-matched');
    
    document.getElementById("success").play()
    winning()
  } else {
    
    triesElement.innerHTML =parseInt(triesElement.innerHTML) + 1;
    
    setTimeout(() => {
      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');
    }, duration)
    document.getElementById("fail").play()
  }
}

function shuffle(array) {
  let current = array.length,
      temp,
      random;

      while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
      }
      return array;
}

function winning() {
  const allBlocksMatched = blocks.every(block => block.classList.contains('is-matched'));
  if (allBlocksMatched) {
    setTimeout(() => {

      document.querySelector('.Winning-buttons').style.display = "block";
      document.getElementById('celebration').play()
    },duration)
  }
}

let tryButton = document.querySelector('.try-again');
tryButton.addEventListener('click', () => {
  document.querySelector('.Winning-buttons').style.display = "none";
  resetBlocks()
  document.querySelector('.tries span').innerHTML = 0;
})

function resetBlocks() {
  blocks.forEach(block => {
    block.classList.remove('is-matched', 'is-flipped');
  });
}

