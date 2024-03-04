#include <stdio.h>

void printNumbers(int n)
{
    for (int i = 0; i <= n; i++)
    {
        printf("%d ", i);
    }
}

int main()
{
    int n;
    scanf("%d", &n);
    printNumbers(n);
    return 0;
}
