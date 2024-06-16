export function uniqueId(){
    return parseInt(((performance.now()+performance.timeOrigin)*10+'').substring(5));
}

export function coupledId(rule){
    return parseInt("1"+rule.id);
}
 