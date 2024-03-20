import java.util.*;
import java.io.*;

public class main {
    public static void main(String[] args) throws IOException {
        PrintWriter pw = new PrintWriter(new FileWriter("h.out"));
        pw.println(50);
        for (int i = 0; i < 50; i++) {
            String res = "";
            for (int j = 0; j < (int) (Math.random() * 100) + 1; j++)
                res += (char) ((int) (Math.random() * 26) + 97);
            pw.println(res);
        }
    }
}