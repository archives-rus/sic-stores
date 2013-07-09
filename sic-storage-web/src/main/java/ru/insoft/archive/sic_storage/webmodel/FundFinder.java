package ru.insoft.archive.sic_storage.webmodel;

import ru.insoft.archive.core_model.EntityMarker;
import ru.insoft.archive.sic_storage.model.table.StrgFund;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 08.07.13
 * Time: 16:28
 * To change this template use File | Settings | File Templates.
 */
public class FundFinder extends EntityMarker
{
    private Boolean found = false;
    private StrgFund fund;

    public Boolean isFound() {
        return found;
    }

    public void setFound(Boolean found) {
        this.found = found;
    }

    public StrgFund getFund() {
        return fund;
    }

    public void setFund(StrgFund fund) {
        this.fund = fund;
    }
}
