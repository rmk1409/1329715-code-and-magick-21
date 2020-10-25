'use strict';

const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_COLOR = `white`;
const TEXT_COLOR = `black`;
const TEXT_FONT = `16px "PT Mono"`;
const TEXT_BASELINE = `hanging`;
const CLOUD_SHADOW_COLOR = `rgba(0, 0, 0, 0.7)`;
const HEADER_X = 120;
const HEADER_Y = 30;
const CHART_HEIGHT = 150;
const COLUMN_WIDTH = 40;
const COLUMN_GAP = 50;
const HORIZONTAL_GAP = 20;
const START_X = 140;
const START_Y = 250;
const YOUR_NAME = `Вы`;
const YOUR_COLOR = `rgba(255, 0, 0, 1)`;
const OTHER_BASE_COLOR = `240, 100%, 50%`;

function paintRect(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function paintCloud(ctx) {
  paintRect(ctx, CLOUD_X + 10, CLOUD_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_SHADOW_COLOR);
  paintRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);
}

function paintUpperText(ctx) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.textBaseline = TEXT_BASELINE;
  ctx.font = TEXT_FONT;
  ctx.fillText(`Ура вы победили!`, HEADER_X, HEADER_Y);
  ctx.fillText(`Список результатов:`, HEADER_X, HEADER_Y + HORIZONTAL_GAP);
}

function paintStatisticForUsers(ctx, names, times) {
  const maxTime = times.sort()[times.length - 1];
  for (let i = 0; i < names.length; i++) {
    const currentName = names[i];
    const currentTime = times[i];
    // name
    const currentX = START_X + ((COLUMN_GAP + COLUMN_WIDTH) * i);
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(currentName, currentX, START_Y);
    // column
    const currentColumnHeight = (currentTime / maxTime * CHART_HEIGHT);
    const columnY = (START_Y - HORIZONTAL_GAP / 2) - CHART_HEIGHT + (CHART_HEIGHT - currentColumnHeight);
    ctx.fillStyle = (YOUR_NAME === currentName) ? YOUR_COLOR : (`hsla(${OTHER_BASE_COLOR}, ${Math.random()})`);
    ctx.fillRect(currentX, columnY, COLUMN_WIDTH, currentColumnHeight);
    // number
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(currentTime.toFixed().toString(), currentX, columnY - HORIZONTAL_GAP);
  }
}

function renderStatistics(ctx, names, times) {
  paintCloud(ctx);
  paintUpperText(ctx);
  paintStatisticForUsers(ctx, names, times);
}

window.stat = {
  render: renderStatistics
};
