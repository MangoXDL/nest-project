interface AccesToken {
  userId: number;
}

/*
{exp: "expires at", iat: "issued at"} -> fasgjsdfj
{userId: number} -> djsalkf
ecrypt(fasgjsdfj + djsalkf + your key) = bbbbb
key = fasgjsdfj.djsalkf.bbbbb
*/
