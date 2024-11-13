const logger = store => {
    store.subscribe((mutation, state) => {
        console.log(`called ${mutation.type}`);
    })
}

export default logger