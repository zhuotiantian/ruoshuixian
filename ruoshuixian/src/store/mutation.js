const mutations = {
    setCode(state, result) {
        state.code = result;
    },
    setRule(state, result) {
        state.rule = result;
    },
    setGameId(state, result) {
        state.gameid = result;
    },
    setLevel(state, result) {
        state.level = result;
    },
    setMemoryTime(state, result) {
        state.memoryTime = result;
    },
    setResult(state, result) {
        state.result = result;
    },
    setPockerNumber(state, result) {
        state.pockerNumber = result;
    },
    setUserInfo(state, result) {
        state.userInfo = result;
    },
    setIsNew(state, isNew) {
        state.isNew = isNew;
    }
};
export default mutations;
