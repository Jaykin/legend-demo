function sleep(ms) {
    console.log('start sleep1 start!');
    let currTimeatamp = +new Date;
    while (+new Date < currTimeatamp + ms) {}
    console.log('wake up sleep1!');
}

sleep(2000);