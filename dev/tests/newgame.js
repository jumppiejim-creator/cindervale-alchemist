// Creates a new character and returns page at main game screen.
async function newGame(page,{zone='A quiet mountain village',cls='Brew potions, the core',race='Versatile and adaptable'}={}){
  await page.waitForSelector('text=New Game',{timeout:30000});
  await page.getByText('New Game').first().click();
  await page.getByText(zone).first().click();
  await page.locator('input').first().fill('Testy');
  await page.getByText('Male').first().click();
  await page.getByText(race).first().click();
  await page.locator('button').filter({hasText:'Continue'}).click();
  await page.getByText(cls).first().click();
  await page.locator('button').filter({hasText:'Continue'}).click();
  for(let i=0;i<30;i++){
    const begin=page.locator('button').filter({hasText:'Begin Adventure'});
    if(await begin.isEnabled())break;
    const plus=page.locator('button',{hasText:/^\+$/});
    const n=await plus.count();
    await plus.nth(i%n).click().catch(()=>{});
  }
  await page.locator('button').filter({hasText:'Begin Adventure'}).click();
  await page.waitForTimeout(800);
}
module.exports={newGame};
