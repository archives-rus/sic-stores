package ru.insoft.dev;

import java.sql.Connection;
import java.sql.SQLException;

/**
 *
 * @author stikkas<stikkas@yandex.ru>
 */
public class H2Functions {

    public static String getFundFullNumber(Integer number, String prefix, String suffix) {
        String result = prefix;
        if (result != null && !result.isEmpty()) {
            result += "-";
        }
        result += number;
        if (suffix != null && !suffix.isEmpty()) {
            result += "-" + suffix;
        }
        return result;
    }

    public static String getYears(Integer start, Integer end) {
        if (start != null && end != null) {
            if (start.equals(end)) {
                return "" + start;
            }
            return start + "-" + end;
        } else if (start != null) {
            return "" + start;
        } else if (end != null) {
            return "" + end;
        }
        return "";
    }

    public static Long setSequenceValue(Connection conn, String sequenceName, Long value) throws SQLException {
        conn.createStatement().execute("ALTER SEQUENCE " + sequenceName + " RESTART WITH " + value);
        return value;
    }
}
