
const shield_shock_ref = [
    [0,    0,    0,    0,    0],
    [0, -0.8, -1.8, -2.8, -3.8],
    [0, -0.6, -1.6, -2.6, -3.6],
    [0, -0.4, -1.4, -2.4, -3.4],
    [0,  0.0, -1.0, -2.0, -3.0],
    [0,  0.5, -0.6, -1.6, -2.6],
    [0,  1.0,  0.0, -1.0, -2.0],
    [0,  1.7,  0.7, -0.4, -1.4],
    [0,  2.4,  1.4,  0.4, -0.6],
    [0,  3.3,  2.3,  1.3,  0.3]
];

function shield_shock(shields, shocks) {
    return shield_shock_ref[shields][shocks];
};
