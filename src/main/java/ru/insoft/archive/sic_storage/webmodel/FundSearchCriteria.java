package ru.insoft.archive.sic_storage.webmodel;

import ru.insoft.archive.extcommons.json.JsonIn;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 08.07.13
 * Time: 15:43
 * To change this template use File | Settings | File Templates.
 */
public class FundSearchCriteria implements JsonIn
{
    private Integer num;
    private String prefix;
    private String suffix;

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }
}
